import ExpoModulesCore
import React
import DGSwiftUtilities


fileprivate enum NativeIDKey: String {
  case textInput;
};

public class RNITextInputWrapperView: ExpoView {

  // MARK: - Properties
  // -------------------

  weak var baseTextInputView: RCTBaseTextInputView?;
  var wrappedTextInput: RNIWrappedTextInput?;
  
  var _didSwizzle = false;
  
  // MARK: - Value Props
  // -------------------
  
  var pasteConfigurationProp: [String]?;
  
  var editMenuDefaultActions: [EditMenuDefaultActions]?;
  var editMenuDefaultActionsProp: [String]? {
    willSet {
      guard let newValue = newValue else {
        self.editMenuDefaultActions = nil;
        return;
      };
      
      self.editMenuDefaultActions = newValue.compactMap {
        .init(rawValue: $0);
      };
    }
  };
  
  // MARK: - Event Props
  // -------------------
  
  let onPasteEvent = EventDispatcher("onPaste");
  
  // MARK: - Lifecycle
  // -----------------
  
  public override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
    super.insertReactSubview(subview, at: atIndex);
    
    guard let nativeID = subview.nativeID,
          let nativeIDKey = NativeIDKey(rawValue: nativeID),
          nativeIDKey == .textInput,
          
          let baseTextInputView = subview as? RCTBaseTextInputView
    else { return };
    
    self.baseTextInputView = baseTextInputView;
    
    switch baseTextInputView.backedTextInputView {
      case let textField as RCTUITextField:
        self.wrappedTextInput = .init(textField: textField);
        
        self._swizzleIfNeeded();
        self._applyPasteConfig();

      case let textView as RCTUITextView:
        self.wrappedTextInput = .init(textView: textView);
        
        self._swizzleIfNeeded();
        self._applyPasteConfig();
        
      default:
        break;
    };
    
  };
  
  // MARK: - Handler Functions
  // -------------------------
  
  public func _paste(_ sender: Any?) {
    guard let typeString = UIPasteboard.general.types.first else { return };
    let typeStringComponents = typeString.components(separatedBy: ".");
    
    guard let typeExtensionString = typeStringComponents.last else { return };
    let senderType = (sender as? NSObject)?.className ?? "\(type(of: sender))";
    
    var eventPayload: Dictionary<String, Any> = [
      "senderType": senderType,
      "type": typeString,
      "typeExtensionString": typeExtensionString,
    
      "hasColors"      : UIPasteboard.general.hasColors,
      "hasImages"      : UIPasteboard.general.hasImages,
      "hasStrings"     : UIPasteboard.general.hasStrings,
      "hasURLs"        : UIPasteboard.general.hasURLs,
      "changeCount"    : UIPasteboard.general.changeCount,
      "isPersistent"   : UIPasteboard.general.isPersistent,
      "name"           : UIPasteboard.general.name,
      "numberOfItems"  : UIPasteboard.general.numberOfItems,
    ];
    
    if let string = UIPasteboard.general.string {
      eventPayload["inferredType"] = "text";
      eventPayload["value"] = string;
      
      self.onPasteEvent.callAsFunction(eventPayload);
      return;
    };
    
    guard let data = UIPasteboard.general.data(forPasteboardType: typeString)
    else { return };
    
    let tempPath = FileManager.default.temporaryDirectory;
    let fileName = UUID().uuidString;
    
    let filePath = tempPath
      .appendingPathComponent(fileName)
      .appendingPathExtension(typeExtensionString);
      
    eventPayload["inferredType"] = "data";
    eventPayload["fileName"] = fileName;
    eventPayload["fileExtension"] = filePath.pathExtension;
    eventPayload["filePath"] = filePath.absoluteString;
      
    try? data.write(to: filePath);
    self.onPasteEvent.callAsFunction(eventPayload);
  };
  
  public func _canPerformAction(
    _ action: Selector,
    withSender sender: Any?
  ) -> Bool?{
  
    guard let editMenuDefaultActions = self.editMenuDefaultActions else { return nil };
    
    let isSupported = editMenuDefaultActions.contains {
      $0.selector == action;
    };
    
    #if DEBUG
    print(
      "RNITextInputWrapperView._canPerformAction",
      "\n - action:", action,
      "\n - sender:", sender.debugDescription,
      "\n - isSupported:", isSupported,
      "\n"
    );
    #endif
    
    return isSupported;
  };
  
  // MARK: - Internal Functions
  // --------------------------
  
  func _applyPasteConfig(){
    guard let wrappedTextInput = self.wrappedTextInput else { return };
    
    let pasteConfigurationProp =
      self.pasteConfigurationProp ?? ["public.text"];
    
    let pasteConfiguration = UIPasteConfiguration(
      acceptableTypeIdentifiers: pasteConfigurationProp
    );
    
    switch wrappedTextInput {
      case let .textField(textField):
        guard let textField = textField.ref else { return };
        textField.pasteConfiguration = pasteConfiguration;
        
      case let .textView(textView):
        guard let textView = textView.ref else { return };
        textView.pasteConfiguration = pasteConfiguration;
    };
  };
  
  func _swizzleIfNeeded(){
    guard !self._didSwizzle,
          let wrappedTextInput = self.wrappedTextInput,
          let textInput = wrappedTextInput.textInput
    else { return };
    
    self._didSwizzle = true;
    
    if let responder = textInput as? UIResponderStandardEditActions {
      SwizzlingHelpers.swizzlePaste(
        forStandardEditActionsResponder: responder
      ){ originalImp, selector in
        
        return { [weak self] _self, sender in
          let invokeOriginalImp = {
            originalImp(_self, selector, sender);
          };
          
          invokeOriginalImp();
          
          guard (_self as AnyObject) === responder,
                let self = self
          else { return };
          
          self._paste(sender);
        };
      };
    };
    
    if let responder = textInput as? UIResponder {
      
      SwizzlingHelpers.swizzleCanPerformAction(
        forResponder: responder
      ) { originalImp, _selector in
      
        return { [weak self] _self, action, selector in
          let invokeOriginalImp = {
            originalImp( _self, _selector, action, selector);
          };
          
          guard (_self as AnyObject) === responder,
                let self = self
           else {
            return invokeOriginalImp();
          };
          
          return self._canPerformAction(action, withSender: selector)
            ?? invokeOriginalImp();
        };
      };
    };
  };
};

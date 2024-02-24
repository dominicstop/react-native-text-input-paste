import ExpoModulesCore

public class RNTextInputPasteModule: Module {

  public func definition() -> ModuleDefinition {
    Name("RNTextInputPasteModule")

    View(RNTextInputPasteView.self) {
      // no-op
    }
  }
}

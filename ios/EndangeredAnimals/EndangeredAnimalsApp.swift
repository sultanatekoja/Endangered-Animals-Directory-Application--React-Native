import SwiftUI

@main
struct EndangeredAnimalsApp: App {
    @State private var directory = DirectoryStore()
    @State private var posts = PostStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(directory)
                .environment(posts)
        }
    }
}

import Foundation
import Observation

/// Forum posts are kept on the device in a JSON file, newest first.
/// There is no shared backend, so each device has its own posts.
@MainActor
@Observable
final class PostStore {
    private(set) var posts: [Post] = []

    private let fileURL: URL

    init(fileURL: URL = PostStore.defaultFileURL) {
        self.fileURL = fileURL
        load()
    }

    func add(_ post: Post) throws {
        try save([post] + posts)
    }

    func delete(at offsets: IndexSet) throws {
        let updated = posts.enumerated()
            .filter { !offsets.contains($0.offset) }
            .map(\.element)
        try save(updated)
    }

    private func load() {
        guard let data = try? Data(contentsOf: fileURL),
              let saved = try? JSONDecoder().decode([Post].self, from: data) else { return }
        posts = saved
    }

    private func save(_ updated: [Post]) throws {
        let data = try JSONEncoder().encode(updated)
        try FileManager.default.createDirectory(
            at: fileURL.deletingLastPathComponent(), withIntermediateDirectories: true)
        try data.write(to: fileURL, options: .atomic)
        posts = updated
    }

    nonisolated static var defaultFileURL: URL {
        URL.applicationSupportDirectory.appending(path: "forum-posts.json")
    }
}

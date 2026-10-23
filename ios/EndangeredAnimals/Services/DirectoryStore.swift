import Foundation
import Observation

/// Loads the animal and charity lists from jsonbin.io and shares them across the tabs.
@MainActor
@Observable
final class DirectoryStore {
    enum LoadState: Equatable {
        case idle
        case loading
        case loaded
        case failed(String)
    }

    private static let animalsURL = URL(string: "https://api.jsonbin.io/v3/b/625dfd5ebc312b30ebe90a13/latest")!
    private static let charitiesURL = URL(string: "https://api.jsonbin.io/v3/b/62711f1d25069545a32cc065/latest")!

    private(set) var animals: [Animal] = []
    private(set) var charities: [Charity] = []
    private(set) var animalsState: LoadState = .idle
    private(set) var charitiesState: LoadState = .idle

    /// Loads both lists the first time a screen needs them.
    func loadIfNeeded() async {
        let needsAnimals = animalsState == .idle
        let needsCharities = charitiesState == .idle
        await withDiscardingTaskGroup { group in
            if needsAnimals { group.addTask { await self.loadAnimals() } }
            if needsCharities { group.addTask { await self.loadCharities() } }
        }
    }

    func loadAnimals() async {
        guard animalsState != .loading else { return }
        animalsState = .loading
        do {
            animals = try await Self.fetch([Animal].self, from: Self.animalsURL)
            animalsState = .loaded
        } catch {
            animalsState = .failed(Self.message(for: error))
        }
    }

    func loadCharities() async {
        guard charitiesState != .loading else { return }
        charitiesState = .loading
        do {
            charities = try await Self.fetch([Charity].self, from: Self.charitiesURL)
            charitiesState = .loaded
        } catch {
            charitiesState = .failed(Self.message(for: error))
        }
    }

    // jsonbin v3 wraps the stored JSON in a "record" field.
    private struct Envelope<Record: Decodable>: Decodable {
        let record: Record
    }

    private static func fetch<T: Decodable>(_ type: T.Type, from url: URL) async throws -> T {
        let (data, response) = try await URLSession.shared.data(from: url)
        if let http = response as? HTTPURLResponse, !(200..<300).contains(http.statusCode) {
            throw URLError(.badServerResponse)
        }
        return try JSONDecoder().decode(Envelope<T>.self, from: data).record
    }

    private static func message(for error: Error) -> String {
        if let urlError = error as? URLError, urlError.code == .notConnectedToInternet {
            return "You're offline. Check your connection and try again."
        }
        return "Couldn't load the directory. Please try again."
    }
}

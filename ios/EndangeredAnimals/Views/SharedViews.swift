import SwiftUI

/// An image loaded from the web, with a neutral placeholder while it loads or if it fails.
struct RemoteImage: View {
    let url: URL?
    var contentMode: ContentMode = .fill

    var body: some View {
        AsyncImage(url: url, transaction: Transaction(animation: .easeIn)) { phase in
            switch phase {
            case .success(let image):
                image.resizable().aspectRatio(contentMode: contentMode)
            case .failure:
                placeholder(systemImage: "photo")
            default:
                placeholder(systemImage: nil)
            }
        }
    }

    private func placeholder(systemImage: String?) -> some View {
        ZStack {
            Color(.secondarySystemBackground)
            if let systemImage {
                Image(systemName: systemImage)
                    .font(.title2)
                    .foregroundStyle(.tertiary)
            } else {
                ProgressView()
            }
        }
    }
}

/// Shows a spinner while loading and a retry button if loading failed.
struct LoadStateOverlay: View {
    let state: DirectoryStore.LoadState
    let isEmpty: Bool
    let retry: () async -> Void

    var body: some View {
        switch state {
        case .idle, .loading:
            if isEmpty { ProgressView() }
        case .failed(let message):
            if isEmpty {
                ContentUnavailableView {
                    Label("Couldn't load", systemImage: "wifi.exclamationmark")
                } description: {
                    Text(message)
                } actions: {
                    Button("Try Again") { Task { await retry() } }
                        .buttonStyle(.borderedProminent)
                }
            }
        case .loaded:
            EmptyView()
        }
    }
}

struct LocationLabel: View {
    let location: String

    var body: some View {
        Label(location, systemImage: "location.fill")
            .font(.subheadline)
            .foregroundStyle(.secondary)
            .labelStyle(.titleAndIcon)
            .lineLimit(1)
    }
}

import SwiftUI

struct CharityListView: View {
    @Environment(DirectoryStore.self) private var directory
    @State private var search = ""

    private var filteredCharities: [Charity] {
        let query = search.trimmingCharacters(in: .whitespaces)
        guard !query.isEmpty else { return directory.charities }
        return directory.charities.filter { $0.name.localizedCaseInsensitiveContains(query) }
    }

    var body: some View {
        NavigationStack {
            List(filteredCharities) { charity in
                NavigationLink(value: charity) {
                    CharityRow(charity: charity)
                }
            }
            .listStyle(.plain)
            .navigationTitle("All Charities")
            .searchable(text: $search, prompt: "Search")
            .navigationDestination(for: Charity.self) { CharityDetailView(charity: $0) }
            .overlay {
                if !search.isEmpty && filteredCharities.isEmpty && !directory.charities.isEmpty {
                    ContentUnavailableView.search(text: search)
                } else {
                    LoadStateOverlay(state: directory.charitiesState, isEmpty: directory.charities.isEmpty) {
                        await directory.loadCharities()
                    }
                }
            }
            .refreshable { await directory.loadCharities() }
            .task { await directory.loadIfNeeded() }
        }
    }
}

struct CharityRow: View {
    let charity: Charity

    var body: some View {
        HStack(spacing: 16) {
            RemoteImage(url: charity.imageURL, contentMode: .fit)
                .frame(width: 90, height: 70)
            Text(charity.name)
                .font(.headline)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.vertical, 4)
    }
}

struct CharityDetailView: View {
    let charity: Charity

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                RemoteImage(url: charity.imageURL, contentMode: .fit)
                    .frame(height: 240)
                    .frame(maxWidth: .infinity)
                    .padding()

                Text(charity.name)
                    .font(.title2.weight(.semibold))
                Text(charity.details)
                    .font(.body)
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal)
            .padding(.bottom, 24)
        }
        .navigationBarTitleDisplayMode(.inline)
    }
}

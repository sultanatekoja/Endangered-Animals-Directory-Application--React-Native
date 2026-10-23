import SwiftUI

struct AnimalListView: View {
    @Environment(DirectoryStore.self) private var directory
    @State private var search = ""

    private var filteredAnimals: [Animal] {
        let query = search.trimmingCharacters(in: .whitespaces)
        guard !query.isEmpty else { return directory.animals }
        return directory.animals.filter {
            $0.name.localizedCaseInsensitiveContains(query)
                || $0.location.localizedCaseInsensitiveContains(query)
        }
    }

    var body: some View {
        NavigationStack {
            List(filteredAnimals) { animal in
                NavigationLink(value: animal) {
                    AnimalRow(animal: animal)
                }
            }
            .listStyle(.plain)
            .navigationTitle("All Animals")
            .searchable(text: $search, prompt: "Search")
            .navigationDestination(for: Animal.self) { AnimalDetailView(animal: $0) }
            .overlay {
                if !search.isEmpty && filteredAnimals.isEmpty && !directory.animals.isEmpty {
                    ContentUnavailableView.search(text: search)
                } else {
                    LoadStateOverlay(state: directory.animalsState, isEmpty: directory.animals.isEmpty) {
                        await directory.loadAnimals()
                    }
                }
            }
            .refreshable { await directory.loadAnimals() }
            .task { await directory.loadIfNeeded() }
        }
    }
}

struct AnimalRow: View {
    let animal: Animal

    var body: some View {
        HStack(spacing: 16) {
            RemoteImage(url: animal.imageURL)
                .frame(width: 110, height: 80)
                .clipShape(.rect(cornerRadius: 10))
            VStack(alignment: .leading, spacing: 6) {
                Text(animal.name)
                    .font(.headline)
                LocationLabel(location: animal.location)
            }
        }
        .padding(.vertical, 4)
    }
}

struct AnimalDetailView: View {
    let animal: Animal

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                RemoteImage(url: animal.imageURL)
                    .frame(height: 300)
                    .frame(maxWidth: .infinity)
                    .clipped()

                VStack(alignment: .leading, spacing: 16) {
                    Text(animal.name)
                        .font(.title.weight(.semibold))
                    Text(animal.details)
                        .font(.body)
                        .foregroundStyle(.secondary)

                    if !animal.location.isEmpty {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("LOCATION")
                                .font(.caption.weight(.semibold))
                            Text(animal.location)
                                .font(.title3)
                        }
                        .padding(.top, 8)
                    }
                }
                .padding(.horizontal)
            }
            .padding(.bottom, 24)
        }
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    NavigationStack {
        AnimalDetailView(animal: Animal(
            id: "1",
            name: "Amur Leopard",
            imageURL: nil,
            location: "Russian Far East",
            details: "One of the rarest big cats in the world."))
    }
}

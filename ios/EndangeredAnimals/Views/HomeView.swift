import SwiftUI

struct HomeView: View {
    @Binding var selectedTab: AppTab
    @Environment(DirectoryStore.self) private var directory

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Welcome to the")
                            .font(.subheadline)
                        Text("WWF\nEndangered Animal Directory")
                            .font(.largeTitle.bold())
                    }
                    .padding(.horizontal)
                    .padding(.top, 24)

                    featuredAnimals
                    featuredCharities
                }
                .padding(.bottom, 24)
            }
            .background(Color(.systemGroupedBackground))
            .navigationDestination(for: Animal.self) { AnimalDetailView(animal: $0) }
            .navigationDestination(for: Charity.self) { CharityDetailView(charity: $0) }
            .refreshable {
                async let animals: Void = directory.loadAnimals()
                async let charities: Void = directory.loadCharities()
                _ = await (animals, charities)
            }
            .task { await directory.loadIfNeeded() }
        }
    }

    private var featuredAnimals: some View {
        VStack(alignment: .leading, spacing: 12) {
            SectionHeader(title: "Featured Animals") { selectedTab = .animals }

            ScrollView(.horizontal, showsIndicators: false) {
                LazyHStack(spacing: 12) {
                    ForEach(directory.animals.prefix(5)) { animal in
                        NavigationLink(value: animal) {
                            AnimalCard(animal: animal)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal)
            }
            .frame(minHeight: 240)
            .overlay {
                LoadStateOverlay(state: directory.animalsState, isEmpty: directory.animals.isEmpty) {
                    await directory.loadAnimals()
                }
            }
        }
    }

    private var featuredCharities: some View {
        VStack(alignment: .leading, spacing: 12) {
            SectionHeader(title: "Featured Charities") { selectedTab = .charities }

            VStack(spacing: 8) {
                ForEach(directory.charities.prefix(4)) { charity in
                    NavigationLink(value: charity) {
                        CharityRow(charity: charity)
                            .padding(12)
                            .background(Color(.systemBackground), in: .rect(cornerRadius: 12))
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal)
            .frame(minHeight: 120)
            .overlay {
                LoadStateOverlay(state: directory.charitiesState, isEmpty: directory.charities.isEmpty) {
                    await directory.loadCharities()
                }
            }
        }
    }
}

private struct SectionHeader: View {
    let title: String
    let viewAll: () -> Void

    var body: some View {
        HStack {
            Text(title).font(.headline)
            Spacer()
            Button("View All", action: viewAll)
                .font(.subheadline)
        }
        .padding(.horizontal)
    }
}

private struct AnimalCard: View {
    let animal: Animal

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            RemoteImage(url: animal.imageURL)
                .frame(width: 280, height: 170)
                .clipShape(.rect(cornerRadius: 12))
            Text(animal.name)
                .font(.title3.bold())
                .lineLimit(1)
            LocationLabel(location: animal.location)
        }
        .frame(width: 280, alignment: .leading)
        .padding(10)
        .background(Color(.systemBackground), in: .rect(cornerRadius: 14))
        .shadow(color: .black.opacity(0.06), radius: 8, y: 4)
    }
}

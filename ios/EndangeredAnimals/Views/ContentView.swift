import SwiftUI

enum AppTab: Hashable {
    case home, animals, charities, forum
}

struct ContentView: View {
    @State private var selectedTab: AppTab = .home

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView(selectedTab: $selectedTab)
                .tabItem { Label("Home", systemImage: "house.fill") }
                .tag(AppTab.home)

            AnimalListView()
                .tabItem { Label("Animals", systemImage: "pawprint.fill") }
                .tag(AppTab.animals)

            CharityListView()
                .tabItem { Label("Charity", systemImage: "heart.circle.fill") }
                .tag(AppTab.charities)

            ForumView()
                .tabItem { Label("Forum", systemImage: "bubble.left.and.bubble.right.fill") }
                .tag(AppTab.forum)
        }
    }
}

#Preview {
    ContentView()
        .environment(DirectoryStore())
        .environment(PostStore())
}

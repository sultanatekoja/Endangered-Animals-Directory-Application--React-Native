# Endangered Animals (SwiftUI)

A native iOS version of the Endangered Animal Directory, written in Swift with SwiftUI.
It has the same four tabs as the React Native app:

- **Home**: featured animals and charities, with "View All" links to the other tabs.
- **Animals**: searchable list of animals, with a detail page for each.
- **Charity**: searchable list of charities, with a detail page for each.
- **Forum**: posts saved on this device. Tap + to write one, swipe left to delete.

Animals and charities load from the same jsonbin.io bins as the React Native app.
Forum posts are stored in a JSON file in the app's Application Support folder, so each device has its own posts.

## Requirements

- A Mac with Xcode 16 or newer
- iOS 17 or newer (simulator or device)

## Run it

1. Open `ios/EndangeredAnimals.xcodeproj` in Xcode.
2. Pick an iPhone simulator from the device menu at the top of the window.
3. Press **Run** (⌘R).

To run on your own iPhone, select the **EndangeredAnimals** target, open **Signing & Capabilities**,
choose your Apple ID under **Team**, and change the bundle identifier if Xcode says it's taken.

## Layout

```
ios/
├── EndangeredAnimals.xcodeproj
└── EndangeredAnimals/
    ├── EndangeredAnimalsApp.swift   app entry point
    ├── Models/                      Animal, Charity, Post, JSON helpers
    ├── Services/                    DirectoryStore (network), PostStore (on-device forum)
    ├── Views/                       one file per tab, plus shared views
    └── Assets.xcassets              accent colour and app icon
```

The Xcode project uses a synced folder, so new Swift files added under `EndangeredAnimals/` are picked up automatically.

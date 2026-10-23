import SwiftUI

struct ForumView: View {
    @Environment(PostStore.self) private var store
    @State private var isComposing = false
    @State private var errorMessage: String?

    private var isShowingError: Binding<Bool> {
        Binding(get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } })
    }

    var body: some View {
        NavigationStack {
            List {
                ForEach(store.posts) { post in
                    NavigationLink(value: post) {
                        PostRow(post: post)
                    }
                }
                .onDelete { offsets in
                    do {
                        try store.delete(at: offsets)
                    } catch {
                        errorMessage = "Couldn't delete the post. Please try again."
                    }
                }
            }
            .listStyle(.plain)
            .navigationTitle("All Posts")
            .navigationDestination(for: Post.self) { PostDetailView(post: $0) }
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        isComposing = true
                    } label: {
                        Label("Add Post", systemImage: "plus.circle.fill")
                    }
                }
            }
            .overlay {
                if store.posts.isEmpty {
                    ContentUnavailableView(
                        "No posts yet",
                        systemImage: "bubble.left.and.bubble.right",
                        description: Text("Tap + to write one."))
                }
            }
            .sheet(isPresented: $isComposing) {
                NewPostView()
            }
            .alert("Something went wrong", isPresented: isShowingError) {
                Button("OK", role: .cancel) {}
            } message: {
                Text(errorMessage ?? "")
            }
        }
    }
}

private struct PostRow: View {
    let post: Post

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(post.created, format: .dateTime.day().month().year())
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(post.title)
                .font(.title3.bold())
            Text(post.author)
                .font(.caption)
                .foregroundStyle(.tint)
            Text(post.detail)
                .font(.footnote)
                .foregroundStyle(.secondary)
                .lineLimit(3)
        }
        .padding(.vertical, 8)
    }
}

struct PostDetailView: View {
    let post: Post

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 10) {
                Text(post.title)
                    .font(.largeTitle.weight(.semibold))
                Text(post.created, format: .dateTime.day().month().year())
                    .font(.subheadline)
                Text(post.author)
                    .font(.subheadline)
                    .foregroundStyle(.tint)
                Text(post.detail)
                    .font(.body)
                    .padding(.top, 20)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
        }
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct NewPostView: View {
    @Environment(PostStore.self) private var store
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var author = ""
    @State private var detail = ""
    @State private var errorMessage: String?

    private var isShowingError: Binding<Bool> {
        Binding(get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } })
    }

    private var canSubmit: Bool {
        !title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !detail.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    TextField("Title", text: $title)
                    TextField("Author", text: $author)
                        .textContentType(.name)
                }
                Section("Details") {
                    TextEditor(text: $detail)
                        .frame(minHeight: 170)
                }
                Section {
                    Button("Submit", action: submit)
                        .frame(maxWidth: .infinity)
                        .disabled(!canSubmit)
                }
            }
            .navigationTitle("Create New Post")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
            }
            .alert("Couldn't save your post", isPresented: isShowingError) {
                Button("OK", role: .cancel) {}
            } message: {
                Text(errorMessage ?? "")
            }
        }
    }

    private func submit() {
        let trimmedAuthor = author.trimmingCharacters(in: .whitespacesAndNewlines)
        let post = Post(
            title: title.trimmingCharacters(in: .whitespacesAndNewlines),
            author: trimmedAuthor.isEmpty ? "Anonymous" : trimmedAuthor,
            detail: detail.trimmingCharacters(in: .whitespacesAndNewlines))
        do {
            try store.add(post)
            dismiss()
        } catch {
            errorMessage = "Please try again."
        }
    }
}

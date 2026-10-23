import Foundation

struct Post: Identifiable, Hashable, Codable {
    var id = UUID()
    var title: String
    var author: String
    var detail: String
    var created = Date()
}

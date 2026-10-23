import Foundation

struct Charity: Identifiable, Hashable, Decodable {
    let id: String
    let name: String
    let imageURL: URL?
    let details: String

    // Field names match the JSON stored on jsonbin.io.
    private enum CodingKeys: String, CodingKey {
        case id, charityname, image, details
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        name = try c.decodeIfPresent(String.self, forKey: .charityname) ?? "Unknown charity"
        id = c.decodeFlexibleID(forKey: .id) ?? name
        imageURL = URL.secure(c.decodeLossyString(forKey: .image))
        details = c.decodeLossyString(forKey: .details) ?? ""
    }

    init(id: String, name: String, imageURL: URL?, details: String) {
        self.id = id
        self.name = name
        self.imageURL = imageURL
        self.details = details
    }
}

import Foundation

struct Animal: Identifiable, Hashable, Decodable {
    let id: String
    let name: String
    let imageURL: URL?
    let location: String
    let details: String

    // Field names match the JSON stored on jsonbin.io.
    private enum CodingKeys: String, CodingKey {
        case id, animalname, images, location, details
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        name = try c.decodeIfPresent(String.self, forKey: .animalname) ?? "Unknown animal"
        id = c.decodeFlexibleID(forKey: .id) ?? name
        imageURL = URL.secure(c.decodeLossyString(forKey: .images))
        location = c.decodeLossyString(forKey: .location) ?? ""
        details = c.decodeLossyString(forKey: .details) ?? ""
    }

    init(id: String, name: String, imageURL: URL?, location: String, details: String) {
        self.id = id
        self.name = name
        self.imageURL = imageURL
        self.location = location
        self.details = details
    }
}

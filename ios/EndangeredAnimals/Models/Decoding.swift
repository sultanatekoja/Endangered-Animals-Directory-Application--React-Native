import Foundation

extension KeyedDecodingContainer {
    /// The jsonbin data isn't strict about types, so ids may be numbers or strings.
    func decodeFlexibleID(forKey key: Key) -> String? {
        if let value = try? decode(String.self, forKey: key) { return value }
        if let value = try? decode(Int.self, forKey: key) { return String(value) }
        if let value = try? decode(Double.self, forKey: key) { return String(value) }
        return nil
    }

    /// Reads a string, or the first string of an array, ignoring anything else.
    func decodeLossyString(forKey key: Key) -> String? {
        if let value = try? decode(String.self, forKey: key) { return value }
        if let values = try? decode([String].self, forKey: key) { return values.first }
        return nil
    }
}

extension URL {
    /// iOS blocks plain http by default, so image links are upgraded to https.
    static func secure(_ string: String?) -> URL? {
        guard var string = string?.trimmingCharacters(in: .whitespacesAndNewlines), !string.isEmpty else {
            return nil
        }
        if string.hasPrefix("http://") {
            string = "https://" + string.dropFirst("http://".count)
        }
        return URL(string: string)
    }
}

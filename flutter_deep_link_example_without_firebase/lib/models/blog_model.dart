class Blog {
  final int id;
  final String title;
  final String? description;
  final String? coverImage;
  final String? bodyHtml;

  Blog(
      {required this.id,
      required this.title,
      required this.description,
      required this.coverImage,
      required this.bodyHtml});

  factory Blog.fromJson(Map<String, dynamic> json) {
    return Blog(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      coverImage: json['cover_image'],
      bodyHtml: json['body_html'],
    );
  }
}

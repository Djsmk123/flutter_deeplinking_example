// ignore_for_file: library_private_types_in_public_api

import 'package:deep_link_example/blog_view.dart';
import 'package:deep_link_example/blogs_screen.dart';
import 'package:deep_link_example/home_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Blog App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue, useMaterial3: true),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/blogs': (context) => const BlogListScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name!.startsWith('/blog/')) {
          var id = settings.name!.substring(6);
          return MaterialPageRoute(
            builder: (context) => BlogScreen(id: id),
          );
        }
        return null;
      },
    );
  }
}

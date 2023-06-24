import 'dart:async';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:uni_links/uni_links.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  StreamSubscription? _sub;
  @override
  void initState() {
    super.initState();
    initUniLinks();
  }

  Future<void> initUniLinks() async {
    // ... check initialLink
    final initialUri = await getInitialUri();
    if (initialUri != null) {
      //onReceivingLink(initialUri.toString());
    }
    // Attach a listener to the stream
    _sub = linkStream.listen((String? link) {
      if (link != null) {
        onReceivingLink(link);
      }
    }, onError: (err) {
      // Handle exception by warning the user their action did not succeed
    });
  }

  onReceivingLink(String? link) {
    log(link.toString(), name: "link received");
    if (link != null) {
      //TODO:
    }
  }

  @override
  void dispose() {
    _sub?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Welcome to the Blog App!'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'This is the home page with dummy messages about blogs.',
              style: TextStyle(fontSize: 18.0),
            ),
            const SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/blogs');
              },
              child: const Text('View Blogs'),
            ),
          ],
        ),
      ),
    );
  }
}

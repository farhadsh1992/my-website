HOW TO ADD OR EDIT A BLOG POST
==============================

Each post is a plain text file in this folder, named:

    post-1.txt
    post-2.txt
    post-3.txt
    ...

The number just needs to keep going up by one for each new post — the
blog page automatically shows every post-N.txt file it finds, newest
number first. You don't need to edit blog.html at all.

FILE FORMAT
-----------
Line 1: the post title
Line 2: the date (write it however you like, e.g. "July 2026")
Line 3: leave blank
Line 4 onward: the post text. Leave a blank line between paragraphs.

Example (post-2.txt):

    My trip to Lisbon
    August 2026

    Spent the weekend exploring Lisbon's old town. The food, the
    trams, the views from Alfama — all worth the trip.

    Already planning to go back before the year is over.

OPTIONAL: ADD A PHOTO
----------------------
To show a picture on a post, add an image in this same folder named
to match the post number, e.g.:

    post-2.jpg

If there's no matching image, the post just shows without one — that's
fine, nothing breaks.

THAT'S IT
---------
Just add/edit the .txt file (and optionally the matching .jpg), then:

    git add public/blog/post-2.txt
    git commit -m "Add blog post about Lisbon trip"
    git push

Cloudflare rebuilds automatically and the blog page updates within a
minute or two — no other file needs to change.

NOTE ON WORD FILES: browsers can't read .docx files directly, so if you
write in Microsoft Word, use "Save As" -> "Plain Text (.txt)" before
adding it here, keeping to the format above.

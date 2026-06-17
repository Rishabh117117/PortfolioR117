# Housing Works — photo slots

Drop optimized photos here (cap ~2000px long edge, quality ~82, jpg/webp).
The page (`app/work/housing-works/page.tsx`) references these exact filenames;
each scene shows a labeled placeholder until the matching file exists.

| Filename                | Scene                | What to use                                                  |
| ----------------------- | -------------------- | ------------------------------------------------------------ |
| `hero.jpg`              | Scene 1 (hero)       | World AIDS Day memorial tags (gradient cards + red ribbons)  |
| `divider-retail.jpg`    | Scene 3 (divider)    | Storefront with the "HOUSING WORKS" sign / a thrift interior |
| `divider-workshop.jpg`  | Scene 6 (divider)    | A Bridges & Barriers board covered in sticky notes           |
| `poster-work-modality.jpg` | (optional aside)  | The "72% Gen Z prefer hybrid" poster                         |

After adding a real frame, delete that scene's `photo slot · …` caption
(`<p className={styles.slotTag}>…</p>`) in `page.tsx`.

Source: the local research folder "Housing works Complete research ( Ext Std)"
— `housing works site Visit/` and `Workshops/…`. Match the timestamped originals
by eye. Diagrams are rebuilt natively as line-SVGs (do not embed report JPEGs).

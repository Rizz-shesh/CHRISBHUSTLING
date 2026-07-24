# Task: GHL push + real images

## A. Admin -> GHL push
- [x] schema: add `pushedToGhlAt` column
- [ ] db:push
- [ ] .env: add GHL_WEBHOOK_URL commented placeholder
- [ ] admin route: `pushToGhl` procedure (auth, POST to webhook, mark row)
- [ ] admin queries: usePushToGhl
- [ ] admin.tsx dashboard: per-row Push to GHL button + status column

## B. Real images (graded, in /public/images)
hero, about, svc1-5, rental, blog1-3 ready.
- [ ] Hero: treated bg / visual
- [ ] About: replace logo placeholder with about.jpg in frame
- [ ] Services: thumbnail per row (svc1-5)
- [ ] Rental: property photo in card
- [ ] Blogs: thumbnail per post (blog1-3)

## Verify
- [ ] build passes
- [ ] screenshots

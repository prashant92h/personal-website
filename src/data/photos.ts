// Add photographs here. Put optimised images in /public/photos/ (or use an
// HTTPS CDN URL) and always provide width/height to avoid layout shift.
// Keep originals backed up locally.

export const photoCategories = ["Landscapes & Nature", "Wildlife", "Travel"] as const;

export interface Photo {
  title: string;
  category: (typeof photoCategories)[number];
  image: string;
  alt: string;
  width: number;
  height: number;
  location?: string;
}

export const photographs: Photo[] = [];

// Optional 1200x630 social preview for the Photography page. Leave undefined to
// use the site-wide image; set to e.g. "/photos/og-photography.jpg" once a real
// photograph is available.
export const photographyOgImage: string | undefined = undefined;

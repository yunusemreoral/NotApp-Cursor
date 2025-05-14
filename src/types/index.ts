export interface Note {
  id: string;
  title: string; // HTML içerik olarak kullanılabilir
  content: string; // HTML içerik olarak kullanılabilir
  tags: string[]; // Etiketler dizisi
  createdAt: Date;
  updatedAt: Date;
} 
/**
 * Type declarations for Nischal Adhikari Portfolio
 */

export interface ThumbnailItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'Tech' | 'Finance' | 'Luxury' | 'Entertainment' | 'Strategy';
  ctrIncrease: string;
  views: string;
  description: string;
  clientName: string;
}

export interface VideoTestimonial {
  id: string;
  name: string;
  title: string;
  thumbnailImg: string;
  avatarImg: string;
  videoDuration: string;
  quote: string;
  channelName: string;
  metrics: string;
  embedId: string; // If we want to simulate or embed
}

export interface WrittenTestimonial {
  id: string;
  name: string;
  avatarImg: string;
  text: string;
  channel: string;
  role: string;
}

export interface Inquiry {
  id: string;
  name: string;
  whatsapp: string;
  channelName: string;
  serviceNeeded: string;
  message: string;
  dateSubmitted: string;
}

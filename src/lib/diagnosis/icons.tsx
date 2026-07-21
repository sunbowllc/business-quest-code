import {
  HandCoins,
  Layers,
  Megaphone,
  Settings,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "./types";

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  product: Layers,
  marketing: Megaphone,
  sales: HandCoins,
  support: Users,
  branding: Sparkles,
  operations: Settings,
};

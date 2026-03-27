import { motion } from "motion/react";

const ALL_CATEGORIES = [
  "all",
  "action",
  "puzzle",
  "strategy",
  "retro",
  "sports",
  "arcade",
];

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap" data-ocid="filter.tab">
      {ALL_CATEGORIES.map((cat) => (
        <motion.button
          key={cat}
          type="button"
          whileTap={{ scale: 0.95 }}
          className={`category-chip ${active === cat ? "active" : ""}`}
          onClick={() => onChange(cat)}
          data-ocid="filter.tab"
        >
          {cat.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
}

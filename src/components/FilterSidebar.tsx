import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  categories?: string[];
  maxPrice?: number;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
}

const FilterSidebar = ({
  onFilterChange = () => {},
  categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Beauty",
    "Toys & Games",
    "Sports & Outdoors",
  ],
  maxPrice = 1000,
}: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, maxPrice],
    rating: 0,
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    const updatedFilters = {
      ...filters,
      categories: updatedCategories,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const updatedFilters = {
      ...filters,
      priceRange: [value[0], value[1] || maxPrice],
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRatingChange = (rating: number) => {
    const updatedFilters = {
      ...filters,
      rating,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <Card className="w-full max-w-[280px] h-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories Filter */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked === true)
                  }
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range Filter */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Price Range</h3>
          <Slider
            defaultValue={[0, maxPrice]}
            max={maxPrice}
            step={1}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={handlePriceChange}
            className="mt-6"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        <Separator />

        {/* Rating Filter */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleRatingChange(rating)}
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {rating === 1 ? "& Up" : `& Up`}
                </span>
                <div
                  className={`h-4 w-4 rounded-full border ${filters.rating === rating ? "bg-primary border-primary" : "border-gray-300"}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={() => {
            const resetFilters = {
              categories: [],
              priceRange: [0, maxPrice],
              rating: 0,
            };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="w-full py-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Reset Filters
        </button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;

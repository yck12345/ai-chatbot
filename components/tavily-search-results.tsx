"use client";

import { type TavilySearchResults } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function TavilySearchResultsComponent({
  searchResults,
}: {
  searchResults: TavilySearchResults;
}) {
  if (!searchResults || searchResults.results.length === 0) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Tavily Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No search results found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Tavily Search Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {searchResults.query && (
          <p className="text-sm text-muted-foreground">
            Query: "{searchResults.query}"
          </p>
        )}
        {searchResults.answer && (
          <div className="border-b pb-2">
            <h3 className="text-md font-semibold">Answer:</h3>
            <p className="text-sm">{searchResults.answer}</p>
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-md font-semibold">Sources:</h3>
          {searchResults.results.map((result, index) => (
            <div key={index} className="text-sm">
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {result.title}
              </a>
              <p className="text-muted-foreground text-xs">{result.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

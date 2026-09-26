const fs = require('fs');

let code = fs.readFileSync('src/app/blog/BlogHubClient.tsx', 'utf8');

// 1. Add useEffect import
code = code.replace(
  "import { useState } from 'react';",
  "import { useState, useEffect } from 'react';"
);

// 2. Add visibleCount state and reset effect
code = code.replace(
  "const [currentCategory, setCurrentCategory] = useState('all');",
  "const [currentCategory, setCurrentCategory] = useState('all');\n  const [visibleCount, setVisibleCount] = useState(9);\n\n  useEffect(() => { setVisibleCount(9); }, [searchQuery, currentCategory]);"
);

// 3. Update the slice logic
code = code.replace(
  "{filteredPosts.slice(currentCategory === 'all' && !searchQuery ? 1 : 0).map((post) => {",
  "{filteredPosts.slice(currentCategory === 'all' && !searchQuery ? 1 : 0, (currentCategory === 'all' && !searchQuery ? 1 : 0) + visibleCount).map((post) => {"
);

// 4. Add "Load More" button after the grid
const loadMoreBtn = `
          </div>
          {filteredPosts.length > (currentCategory === 'all' && !searchQuery ? 1 : 0) + visibleCount && (
            <div className="flex justify-center mt-10">
              <button 
                onClick={() => setVisibleCount(prev => prev + 9)}
                className="px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-highest transition-colors flex items-center gap-2"
              >
                <span>Muat Lebih Banyak</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>
          )}
        ) : (`;

code = code.replace(
  "          </div>\n        ) : (",
  loadMoreBtn
);

fs.writeFileSync('src/app/blog/BlogHubClient.tsx', code);

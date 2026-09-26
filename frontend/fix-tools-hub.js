const fs = require('fs');

let code = fs.readFileSync('src/app/tools/ToolsHubClient.tsx', 'utf8');

// 1. Add visibleCount state
code = code.replace(
  "const [filterMerdeka, setFilterMerdeka] = useState(false);",
  "const [filterMerdeka, setFilterMerdeka] = useState(false);\n  const [visibleCount, setVisibleCount] = useState(12);"
);

// 2. Reset visibleCount when search or filter changes
code = code.replace(
  "const handleReset = () => {",
  "// Reset visible count when filters change\n  useEffect(() => { setVisibleCount(12); }, [searchQuery, currentCategory, filterPopular, filterMerdeka]);\n\n  const handleReset = () => {"
);

// 3. Update the render loop to use visibleCount
code = code.replace(
  "{filteredTools.map((tool) => (",
  "{filteredTools.slice(0, visibleCount).map((tool) => ("
);

// 4. Add "Load More" button after the grid
const loadMoreBtn = `
          </div>
          {filteredTools.length > visibleCount && (
            <div className="flex justify-center mt-8">
              <button 
                onClick={() => setVisibleCount(prev => prev + 12)}
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

fs.writeFileSync('src/app/tools/ToolsHubClient.tsx', code);

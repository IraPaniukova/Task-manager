Backend:

Added the lines to supress .sqlserver usage in the backend test project  in csproj (Because .inMemory has a conflict with .sqlserver):

<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.12" >
 <ExcludeAssets>runtime</ExcludeAssets>
</PackageReference>

(P.S: I could use sqlite in memory instead without adding the lines - somehow it doesn't have the same conflict as .inMemory)
------------------------------
Frontend:

Installed 
vitest,  testing-library/jest-dom, testing-library/react

Added in package.json  in "scripts": {
		"test": "vitest --environment jsdom"

To mock fetch with vitest:
	vi.stubGlobal('fetch', vi.fn(() =>
   	 Promise.resolve({
        	ok: true,
       	 json: () => Promise.resolve([]),
    	})
	));
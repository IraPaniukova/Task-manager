Added the lines to supress .sqlserver usage in the test project:

<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.12" >
 <ExcludeAssets>runtime</ExcludeAssets>
</PackageReference>
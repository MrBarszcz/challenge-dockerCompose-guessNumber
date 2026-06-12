FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["GuessNumberGame.csproj", "./"]
RUN dotnet restore "./GuessNumberGame.csproj"
COPY . .
RUN dotnet publish "GuessNumberGame.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "GuessNumberGame.dll"]
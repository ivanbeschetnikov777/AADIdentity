#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq
WORKDIR /app
EXPOSE 44316

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq
WORKDIR /src
COPY ["auth/AuthExperiments.csproj", "auth/"]
RUN dotnet restore "auth/AuthExperiments.csproj" --disable-parallel
COPY . .
WORKDIR "/src/auth"
RUN dotnet build "AuthExperiments.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AuthExperiments.csproj" -c Release -o /app/publish

ENV ASPNETCORE_URLS=http://+:44316

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuthExperiments.dll"]
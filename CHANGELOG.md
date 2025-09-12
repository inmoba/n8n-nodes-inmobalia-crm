# Changelog

All notable changes to this project are documented in this file.

This project follows Semantic Versioning. Entries are grouped by type using Keep a Changelog conventions.

## [1.1.1] - 2025-09-12

### Added
- Enable node to be used as a Tool in n8n (`usableAsTool: true`).

### Chore
- Bumped package version to 1.1.1.

### Breaking Changes
- None.

## [1.1.0] - 2025-09-11

### Added
- Inmobalia CRM n8n node with OAuth2 authentication and centralized HTTP client.
- Contacts: list, get, listFiles, listTags, listSources, listLeadStatus, listAdditionals.
- Properties: list, get, getByReference, listTypes, listCategories, listTags, listFeatures, listCustomFeatures, listDescriptions, listFiles, listImages, listHtmls, listLinks, getHtml, getImage, getFile, getLink, getDescription, getCategory, getType, getFeatureByCode.
- Bookings: list, get, getByCode, getCheckIn, getCheckOut, listByContact, listByProperty.
- Users: list, get, getMe.
- Web Leads: list, get.
- Enquiries: list, get.
- Events: list, get.
- Sales: list, get.
- Locations: listCountries, getCountry, getCountryByIso, listProvincesByCountry, getProvince, listCitiesByProvince, getCity, listAreasByCity, getArea, listSubareasByArea, getSubarea.
- Date utilities for ISO 8601 formatting and normalization.
- CI workflow and updated npm-publish workflow (uses latest GitHub Actions).

### Changed
- Simplified sorting logic to accept single-field `sort` input without normalization.
- Updated ESLint setup with stylistic rules and latest TypeScript ESLint plugins.

### Documentation
- README updated with feature overview and usage instructions.

### Chore
- Bumped package version to 1.1.0.

### Breaking Changes
- None.

## [1.0.0]

- Initial release.

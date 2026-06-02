# Firestore Database Schema

## Collections

### `projects`
| Field | Type | Description |
|-------|------|-------------|
| slug | string | URL slug |
| title | string | Project name |
| description | string | Short description |
| thumbnail | string | Image URL |
| technologies | string[] | Tech stack |
| githubUrl | string? | GitHub link |
| liveUrl | string? | Demo link |
| featured | boolean | Show on homepage |
| screenshots | string[]? | Gallery images |
| caseStudy | string? | Case study text |
| challenges | string? | Challenges faced |
| solutions | string? | Solutions implemented |
| lessons | string? | Lessons learned |
| createdAt | string | ISO date |

### `certificates`
| Field | Type |
|-------|------|
| title | string |
| description | string |
| organization | string |
| date | string |
| imageUrl | string? |
| fileUrl | string? |
| fileType | "image" \| "pdf"? |
| featured | boolean? |

### `achievements`
| Field | Type |
|-------|------|
| title | string |
| description | string |
| date | string |
| type | internship \| training \| certification \| project \| other |

### `tutorials`
| Field | Type |
|-------|------|
| slug | string |
| title | string |
| description | string |
| type | youtube \| pdf \| article \| blog |
| category | React \| JavaScript \| Python \| HTML/CSS \| AI Tools |
| content | string? |
| videoUrl | string? |
| pdfUrl | string? |
| thumbnail | string? |
| views | number |
| likes | number |
| featured | boolean? |
| publishedAt | string |

### `blogPosts`
| Field | Type |
|-------|------|
| slug | string |
| title | string |
| excerpt | string |
| content | string (markdown) |
| coverImage | string? |
| categories | string[] |
| tags | string[] |
| featured | boolean? |
| publishedAt | string |
| author | string? |

### `gallery`
| Field | Type |
|-------|------|
| title | string |
| imageUrl | string |
| category | string |
| description | string? |
| createdAt | string |

### `testimonials`
| Field | Type |
|-------|------|
| name | string |
| photo | string? |
| occupation | string |
| rating | number (1-5) |
| message | string |
| approved | boolean |
| createdAt | string |

### `skills`
| Field | Type |
|-------|------|
| name | string |
| category | frontend \| backend \| tools |
| proficiency | number (0-100) |
| order | number? |

### `settings` (document: `site`)
| Field | Type |
|-------|------|
| heroTitle | string? |
| heroSubtitle | string? |
| stats | object |
| social | object? |

### `contacts`
| Field | Type |
|-------|------|
| name | string |
| email | string |
| message | string |
| createdAt | timestamp |
| read | boolean |

## Security Rules (recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null;
    }
    match /{collection}/{doc} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /contacts/{doc} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }
    match /testimonials/{doc} {
      allow create: if true;
      allow read: if resource.data.approved == true || isAdmin();
      allow update, delete: if isAdmin();
    }
  }
}
```

## Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

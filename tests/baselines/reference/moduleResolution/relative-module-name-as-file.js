load as file with relative name in current directory
Resolving "./foo" from /foo/bar/baz.ts when module has extension: .ts
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .tsx
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts"
  ]
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .tsx with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts"
  ]
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .kts
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.kts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.kts",
    "extension": ".kts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts",
    "/foo/bar/foo.tsx"
  ]
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .kts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.kts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.kts",
    "extension": ".kts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts",
    "/foo/bar/foo.tsx"
  ]
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .d.ts
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts",
    "/foo/bar/foo.tsx",
    "/foo/bar/foo.kts"
  ]
}

Resolving "./foo" from /foo/bar/baz.ts when module has extension: .d.ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/bar/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/bar/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/bar/foo.ts",
    "/foo/bar/foo.tsx",
    "/foo/bar/foo.kts"
  ]
}


load as file with relative name in parent directory
Resolving "../foo" from /foo/bar/baz.ts when module has extension: .ts
//// [/foo/bar/baz.ts]


//// [/foo/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .tsx
//// [/foo/bar/baz.ts]


//// [/foo/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts"
  ]
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .tsx with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts"
  ]
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .kts
//// [/foo/bar/baz.ts]


//// [/foo/foo.kts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.kts",
    "extension": ".kts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts",
    "/foo/foo.tsx"
  ]
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .kts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/foo.kts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.kts",
    "extension": ".kts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts",
    "/foo/foo.tsx"
  ]
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .d.ts
//// [/foo/bar/baz.ts]


//// [/foo/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts",
    "/foo/foo.tsx",
    "/foo/foo.kts"
  ]
}

Resolving "../foo" from /foo/bar/baz.ts when module has extension: .d.ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo/foo.ts",
    "/foo/foo.tsx",
    "/foo/foo.kts"
  ]
}


load as file with name starting with directory seperator
Resolving "/foo" from /foo/bar/baz.ts when module has extension: .ts
//// [/foo/bar/baz.ts]


//// [/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .tsx
//// [/foo/bar/baz.ts]


//// [/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo.ts"
  ]
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .tsx with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo.ts"
  ]
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .kts
//// [/foo/bar/baz.ts]


//// [/foo.kts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.kts",
    "extension": ".kts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo.ts",
    "/foo.tsx"
  ]
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .kts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo.kts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.kts",
    "extension": ".kts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo.ts",
    "/foo.tsx"
  ]
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .d.ts
//// [/foo/bar/baz.ts]


//// [/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo.ts",
    "/foo.tsx",
    "/foo.kts"
  ]
}

Resolving "/foo" from /foo/bar/baz.ts when module has extension: .d.ts with host that doesnt have directoryExists
//// [/foo/bar/baz.ts]


//// [/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/foo.ts",
    "/foo.tsx",
    "/foo.kts"
  ]
}


load as file with name starting with window root
Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .ts
//// [c:/foo/bar/baz.ts]


//// [c:/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .ts with host that doesnt have directoryExists
//// [c:/foo/bar/baz.ts]


//// [c:/foo.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .tsx
//// [c:/foo/bar/baz.ts]


//// [c:/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "c:/foo.ts"
  ]
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .tsx with host that doesnt have directoryExists
//// [c:/foo/bar/baz.ts]


//// [c:/foo.tsx]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.tsx",
    "extension": ".tsx",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "c:/foo.ts"
  ]
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .kts
//// [c:/foo/bar/baz.ts]


//// [c:/foo.kts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.kts",
    "extension": ".kts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "c:/foo.ts",
    "c:/foo.tsx"
  ]
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .kts with host that doesnt have directoryExists
//// [c:/foo/bar/baz.ts]


//// [c:/foo.kts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.kts",
    "extension": ".kts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "c:/foo.ts",
    "c:/foo.tsx"
  ]
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .d.ts
//// [c:/foo/bar/baz.ts]


//// [c:/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "c:/foo.ts",
    "c:/foo.tsx",
    "c:/foo.kts"
  ]
}

Resolving "c:/foo" from c:/foo/bar/baz.ts when module has extension: .d.ts with host that doesnt have directoryExists
//// [c:/foo/bar/baz.ts]


//// [c:/foo.d.ts]


Resolution:: {
  "resolvedModule": {
    "resolvedFileName": "c:/foo.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "c:/foo.ts",
    "c:/foo.tsx",
    "c:/foo.kts"
  ]
}


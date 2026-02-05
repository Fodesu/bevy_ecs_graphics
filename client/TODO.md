# TODO List

## High Priority (Core Features)

| Feature | Description | Location |
|---------|-------------|----------|
| Connection Status Indicator | Show connection status to Bevy server (online/offline) | Header right corner |
| Server Configuration | Set Bevy server address and port | Settings page |
| RPC Caller | Select method, input parameters, execute call and display result | Home page or new page |
| Entity Explorer | View entity list from `world.spawn_entity` | New page `/entities` |

## Medium Priority (Enhancement Features)

| Feature | Description |
|---------|-------------|
| Resource Viewer | View Bevy resources via `world.get_resources` |
| Component Editor | View and edit entity components via `world.get_components` |
| Request History | Record previous RPC calls history |
| Response Formatter | JSON syntax highlighting and folding |

## UI/UX Improvements

| Feature | Description |
|---------|-------------|
| Theme Toggle | Dark/Light mode switch (CSS variables exist, need toggle button) |
| Keyboard Shortcuts | Implement Ctrl+K search functionality |
| Toast Notifications | Success/Error toast messages |
| Skeleton Loading | Replace simple Spinner with skeleton screens |

## Next Steps

### 1. Connection Status Indicator (Easiest)
```tsx
// Add to Header
<div className="flex items-center gap-2">
  <div className={cn("size-2 rounded-full", isConnected ? "bg-green-500" : "bg-red-500")} />
  <span className="text-xs text-muted-foreground">
    {isConnected ? "Connected" : "Disconnected"}
  </span>
</div>
```

### 2. Settings Page Content
- Server URL input field
- Connection timeout setting
- Theme toggle switch

### 3. Method Call Feature
Click on a method to open a form, input parameters, and send the request.

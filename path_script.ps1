function Show-Tree {
    param(
        [string]$Path = ".",
        [string]$Indent = ""
    )

    # Get all items in the directory excluding those named 'node_modules'
    $items = Get-ChildItem -LiteralPath $Path | Where-Object { $_.Name -ne 'node_modules' }
    $count = $items.Count

    for ($i = 0; $i -lt $count; $i++) {
        $item = $items[$i]
        # Use GetFileName to extract just the file or folder name
        $name = [System.IO.Path]::GetFileName($item.FullName)

        # Determine the tree branch symbol and prepare new indent
        if ($i -eq $count - 1) {
            $prefix = "└─"
            $newIndent = "$Indent    "
        } else {
            $prefix = "├─"
            $newIndent = "$Indent│   "
        }

        Write-Output "$Indent$prefix$name"

        # Recursively process directories
        if ($item.PSIsContainer) {
            Show-Tree -Path $item.FullName -Indent $newIndent
        }
    }
}

# Example usage:
Show-Tree -Path "C:\Users\s9903\OneDrive\Desktop\React-Amazon-Clone"

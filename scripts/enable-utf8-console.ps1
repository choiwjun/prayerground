[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Force the current PowerShell session to use UTF-8 for console I/O and common file writes.
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

[Console]::InputEncoding = $utf8NoBom
[Console]::OutputEncoding = $utf8NoBom
$OutputEncoding = $utf8NoBom

$null = & chcp.com 65001

$PSDefaultParameterValues["Out-File:Encoding"] = "utf8"
$PSDefaultParameterValues["Set-Content:Encoding"] = "utf8"
$PSDefaultParameterValues["Add-Content:Encoding"] = "utf8"
$PSDefaultParameterValues["Export-Csv:Encoding"] = "utf8"
$PSDefaultParameterValues["Get-Content:Encoding"] = "utf8"
$PSDefaultParameterValues["Select-String:Encoding"] = "utf8"
$env:PYTHONUTF8 = "1"

Write-Host "UTF-8 console mode enabled for this PowerShell session." -ForegroundColor Green
Write-Host "Console InputEncoding : $([Console]::InputEncoding.WebName)"
Write-Host "Console OutputEncoding: $([Console]::OutputEncoding.WebName)"
Write-Host "PowerShell OutputEncoding: $($OutputEncoding.WebName)"

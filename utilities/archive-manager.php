<?php
/**
 * Arka Kids - Archive Manager Utility
 * Securely handle zipping and unzipping of project files.
 * 
 * USAGE: 
 * ?action=zip&source=folder_name&out=archive.zip
 * ?action=unzip&file=archive.zip&to=destination_folder
 */

// Basic Security - Replace with your own secret key or simple password check
$SECRET_KEY = "arkakids_admin_secret"; // CHANGE THIS
if (($_GET['key'] ?? '') !== $SECRET_KEY) {
    die("Unauthorized access.");
}

function zipData($source, $destination)
{
    if (extension_loaded('zip')) {
        if (file_exists($source)) {
            $zip = new ZipArchive();
            if ($zip->open($destination, ZIPARCHIVE::CREATE)) {
                $source = realpath($source);
                if (is_dir($source)) {
                    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);
                    foreach ($files as $file) {
                        $file = realpath($file);
                        if (is_dir($file)) {
                            $zip->addEmptyDir(str_replace($source . DIRECTORY_SET, '', $file . DIRECTORY_SEPARATOR));
                        } else if (is_file($file)) {
                            $zip->addFromString(str_replace($source . DIRECTORY_SEPARATOR, '', $file), file_get_contents($file));
                        }
                    }
                } else if (is_file($source)) {
                    $zip->addFromString(basename($source), file_get_contents($source));
                }
            }
            return $zip->close();
        }
    }
    return false;
}

function unzipData($file, $destination)
{
    $zip = new ZipArchive;
    $res = $zip->open($file);
    if ($res === TRUE) {
        $zip->extractTo($destination);
        $zip->close();
        return true;
    }
    return false;
}

$action = $_GET['action'] ?? '';

if ($action === 'zip') {
    $src = $_GET['source'] ?? './';
    $out = $_GET['out'] ?? 'project_backup_' . date('Y-m-d') . '.zip';
    if (zipData($src, $out)) {
        echo "Successfully zipped $src to $out";
    } else {
        echo "Failed to zip $src";
    }
} elseif ($action === 'unzip') {
    $file = $_GET['file'] ?? '';
    $to = $_GET['to'] ?? './';
    if (empty($file))
        die("No file specified.");
    if (unzipData($file, $to)) {
        echo "Successfully unzipped $file to $to";
    } else {
        echo "Failed to unzip $file";
    }
} else {
    echo "Usage: ?action=zip|unzip&key=$SECRET_KEY";
}

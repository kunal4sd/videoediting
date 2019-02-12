<?php

namespace App\Modules\Interfaces;

use App\Modules\Abstracts\AbstractFile;

interface FilesInterface
{

    /**
     * @return AbstractFile[]
     */
    public function get_files();

    /**
     * @param AbstractFile[] $files
     * @return FilesInterface
     */
    public function set_files(array $files);

    /**
     * @param AbstractFile $file
     * @return FilesInterface
     */
    public function add_file(AbstractFile $file);

    /**
     * @param AbstractFile[] $files
     * @return FilesInterface
     */
    public function add_files(array $files);
}

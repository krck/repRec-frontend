<?php

class WhDataSheetModel
{
    public readonly int $dataSheetId;
    public readonly string $name;
    public readonly string $M;
    public readonly int $T;
    public readonly string $Sv;
    public readonly string $invSv;
    public readonly int $W;
    public readonly string $Ld;
    public readonly int $OC;

    public function __construct($data)
    {
        $this->dataSheetId = intval($data[0]);
        // $this->line = strval($data[1]);
        $this->name = strval($data[2]);
        $this->M = strval($data[3]);
        $this->T = intval($data[4]);
        $this->Sv = strval($data[5]);
        $this->invSv = strval($data[6]);
        // $this->inv_sv_descr = strval($data[7]);
        $this->W = intval($data[8]);
        $this->Ld = strval($data[9]);
        $this->OC = intval($data[10]);
        // $this->base_size = strval($data[11]);
        // $this->base_size_descr = strval($data[12]);
    }
}

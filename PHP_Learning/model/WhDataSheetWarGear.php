<?php

class WhDataSheetWarGear
{
    public readonly int $dataSheetId;
    public readonly string $fullName;

    public readonly string $name;
    public readonly string $range;
    public readonly string $type;
    public readonly string $A;
    public readonly string $BS_WS;
    public readonly string $S;
    public readonly int $AP;
    public readonly string $D;

    public function __construct($data, $fullName)
    {
        $this->dataSheetId = intval($data[0]);
        $this->fullName = $fullName;

        // $this->line = strval($data[1]);
        // $this->line_in_wargear = strval($data[2]);
        // $this->dice = strval($data[3]);
        $this->name = strval($data[4] ?? '');
        // $this->description = strval($data[5]);
        $this->range = strval($data[6] ?? '');
        $this->type = strval($data[7] ?? '');
        $this->A = strval($data[8] ?? '');
        $this->BS_WS = strval($data[9] ?? '');
        $this->S = strval($data[10] ?? '');
        $this->AP = intval($data[11] ?? 0);
        $this->D = strval($data[12] ?? '');
    }
}

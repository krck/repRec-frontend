<?php

class WhDataSheet
{
    public readonly int $id;
    public readonly string $name;
    public readonly string $factionId;
    public readonly string $role;

    public function __construct($data)
    {
        $this->id = intval($data[0]);
        $this->name = strval($data[1] ?? '');
        $this->factionId = strval($data[2] ?? '');
        // $this->source_id = $data[3];
        // $this->legend = $data[4];
        $this->role = strval($data[5] ?? '');
        // $this->loadout = $data['loadout'];
        // $this->transport = $data['transport'];
        // $this->virtual = $data['virtual'];
        // $this->leader_head = $data['leader_head'];
        // $this->leader_footer = $data['leader_footer'];
        // $this->damaged_w = $data['damaged_w'];
        // $this->damaged_description = $data['damaged_description'];
        // $this->link = $data['link'];
    }
}

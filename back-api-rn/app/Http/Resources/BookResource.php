<?php

namespace App\Http\Resources;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $auth = Author::select('name')->where('id', $this->authors_id)->first();
        return [
            "id" => $this->id,
            "name" => $this->name,
            "editorial" => $this->editorial,
            'capitulos' => $this->capitulos,
            "autor" => $auth->name,
        ];
    }
}

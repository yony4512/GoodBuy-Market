<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    //
    public function index()
    {
        $productos = Producto::all();
   return Inertia::render('Welcome', [
            'productos' => $productos
        ]);
    }
    public function create()
    {
        return view('productos.create');
    }
    public function store(Request $request)
    {
        // Validar y guardar el producto
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'nullable|url',
            'detalles' => 'nullable|string',
            'vendedor' => 'required|string|max:255',
        ]);

        Producto::create($request->all());
        return redirect()->route('productos.index')->with('success', 'Producto creado exitosamente.');
    }
    public function show($id)
    {
        $producto = Producto::find($id);
        return Inertia::render('Producto', [
            'producto' => $producto
        ]);
    }
    public function edit($id)
    {
        // Aquí se buscaría el producto por su ID y se mostraría para editar
        return view('productos.edit', compact('id'));
    }
    public function update(Request $request, $id)
    {
        // Validar y actualizar el producto
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'detalles' => 'nullable|string',
            'vendedor' => 'required|string|max:255',
        ]);

        // Aquí se actualizaría el producto en la base de datos

        return redirect()->route('productos.index')->with('success', 'Producto actualizado exitosamente.');
    }
    public function destroy($id)
    {
        // Aquí se eliminaría el producto por su ID
        return redirect()->route('productos.index')->with('success', 'Producto eliminado exitosamente.');
    }
}

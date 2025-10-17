import React, { useEffect, useRef, useState } from "react"
import type { Product, Category } from "@store/types"
import ModalShell from "./ModalShell"
import LabeledInput from "./LabeledInput"

export default function ProductModal({
  mode,
  product,
  onClose,
  onSubmit,
}: {
  mode: "add" | "edit"
  product?: Product
  onClose: () => void
  onSubmit: (payload: Omit<Product, "id"> | Partial<Product>) => void | Promise<void>
}) {
  const [name, setName] = useState(product?.name ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [price, setPrice] = useState(product ? String(product.price) : "")
  const [category, setCategory] = useState<Category>(product?.category ?? "Electronics")
  const [stock, setStock] = useState(product ? String(product.stock) : "0")
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "")
  const [previewOk, setPreviewOk] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const firstInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  const validate = () => {
    const err: Record<string, string> = {}
    if (!name.trim()) err.name = "Name is required"
    const p = parseFloat(price)
    if (isNaN(p) || p < 0) err.price = "Valid price required"
    const s = parseInt(stock, 10)
    if (isNaN(s) || s < 0) err.stock = "Valid stock required"
    try {
      if (!imageUrl.trim()) err.imageUrl = "Image URL is required"
      else new URL(imageUrl)
    } catch {
      err.imageUrl = "Valid image URL required"
    }
    if (!description.trim()) err.description = "Description is required"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  useEffect(() => {
    if (!imageUrl) return setPreviewOk(true)
    const img = new Image()
    img.onload = () => setPreviewOk(true)
    img.onerror = () => setPreviewOk(false)
    img.src = imageUrl
  }, [imageUrl])

  const submit = async () => {
    if (!validate()) return
    setBusy(true)
    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category,
        stock: parseInt(stock, 10),
        imageUrl: imageUrl.trim(),
      } as Omit<Product, "id">
      await onSubmit(payload)
    } finally {
      setBusy(false)
    }
  }

  return (
    <ModalShell onClose={onClose}>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-3 text-lg font-semibold">
          {mode === "add" ? "Add Product" : "Edit Product"}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-3">
            <LabeledInput label="Name" error={errors.name}>
              <input
                ref={firstInputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
              />
            </LabeledInput>
            <LabeledInput label="Description" error={errors.description}>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
              />
            </LabeledInput>
            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Price (€)" error={errors.price}>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  inputMode="decimal"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
                />
              </LabeledInput>
              <LabeledInput label="Stock" error={errors.stock}>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type="number"
                  inputMode="numeric"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
                />
              </LabeledInput>
            </div>
            <LabeledInput label="Category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
              >
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Grocery</option>
              </select>
            </LabeledInput>
            <LabeledInput label="Image URL" error={errors.imageUrl}>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
              />
            </LabeledInput>
          </div>
          <div className="sm:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-2 text-center text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              <div className="mb-2 font-medium">Image Preview</div>
              {imageUrl && previewOk ? (
                <img
                  src={imageUrl}
                  alt="preview"
                  className="mx-auto aspect-[4/3] w-full rounded object-cover"
                />
              ) : (
                <div className="mx-auto aspect-[4/3] w-full rounded bg-gray-100 p-4 text-gray-400 dark:bg-gray-800">
                  {imageUrl ? "Could not load image" : "Paste an image URL"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={busy}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {busy ? "Saving..." : mode === "add" ? "Add Product" : "Save Changes"}
          </button>
        </div>
      </div>
    </ModalShell>
  )
}

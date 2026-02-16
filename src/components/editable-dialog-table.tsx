import * as React from "react"
import { Pencil, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogTableWrapper } from "./dialog-table-wrapper"

export type TableDataRow = {
  id: string | number
  [key: string]: unknown
}

type EditableDialogTableProps = {
  title: string
  description?: string
  data: TableDataRow[]
  columns: {
    key: string
    label: string
    editable?: boolean
  }[]
  onEdit?: (id: string | number, key: string, value: unknown) => void
  trigger?: React.ReactNode
}

export function EditableDialogTable({
  title,
  description,
  data,
  columns,
  onEdit,
  trigger,
}: EditableDialogTableProps) {
  const [tableData, setTableData] = React.useState(data)
  const [editingCell, setEditingCell] = React.useState<{
    rowId: string | number
    columnKey: string
    value: unknown
  } | null>(null)
  const [editingRowAllFields, setEditingRowAllFields] = React.useState<{
    rowId: string | number
    values: Record<string, unknown>
  } | null>(null)

  React.useEffect(() => {
    setTableData(data)
  }, [data])

  const handleEditStart = (rowId: string | number, columnKey: string, currentValue: unknown) => {
    setEditingCell({ rowId, columnKey, value: currentValue })
    setEditingRowAllFields(null)
  }

  const handleEditAllStart = (rowId: string | number) => {
    const row = tableData.find((r) => r.id === rowId)
    if (!row) return
    
    const values: Record<string, unknown> = {}
    columns.forEach((col) => {
      if (col.editable !== false) {
        values[col.key] = row[col.key]
      }
    })
    
    setEditingRowAllFields({ rowId, values })
    setEditingCell(null)
  }

  const handleEditSave = () => {
    if (!editingCell) return

    // Update local state
    setTableData((prev) =>
      prev.map((row) =>
        row.id === editingCell.rowId
          ? { ...row, [editingCell.columnKey]: editingCell.value }
          : row
      )
    )

    // Call parent callback
    onEdit?.(editingCell.rowId, editingCell.columnKey, editingCell.value)

    setEditingCell(null)
  }

  const handleEditAllSave = () => {
    if (!editingRowAllFields) return

    // Update local state
    setTableData((prev) =>
      prev.map((row) =>
        row.id === editingRowAllFields.rowId
          ? { ...row, ...editingRowAllFields.values }
          : row
      )
    )

    // Call parent callback for each field
    Object.entries(editingRowAllFields.values).forEach(([key, value]) => {
      onEdit?.(editingRowAllFields.rowId, key, value)
    })

    setEditingRowAllFields(null)
  }

  const handleEditCancel = () => {
    setEditingCell(null)
    setEditingRowAllFields(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Open Table</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogTableWrapper>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                <TableHead className="w-[60px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.editable !== false ? (
                        <Popover
                          open={
                            editingCell?.rowId === row.id &&
                            editingCell?.columnKey === column.key
                          }
                          onOpenChange={(open: boolean) => {
                            if (!open) handleEditCancel()
                          }}
                        >
                          <PopoverTrigger asChild>
                            <button
                              className="w-full text-left hover:bg-accent/60 hover:shadow-sm px-3 py-1.5 -mx-3 -my-1.5 rounded-md transition-all duration-200 cursor-pointer group relative"
                              onClick={() => {
                                handleEditStart(row.id, column.key, row[column.key])
                              }}
                            >
                              <span className="group-hover:text-foreground/90">
                                {String(row[column.key] ?? "")}
                              </span>
                              <Pencil className="h-3 w-3 absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-0" align="start">
                            <div className="space-y-0">
                              <div className="px-5 pt-4 pb-3 border-b bg-muted/30">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                  <Pencil className="h-4 w-4" />
                                  Edit {column.label}
                                </h4>
                              </div>
                              <div className="px-5 py-4 space-y-3">
                                <div className="space-y-2">
                                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    {column.label}
                                  </label>
                                  <Input
                                    value={String(editingCell?.value ?? "")}
                                    onChange={(e) =>
                                      setEditingCell({
                                        rowId: row.id,
                                        columnKey: column.key,
                                        value: e.target.value,
                                      })
                                    }
                                    className="focus-visible:ring-2"
                                    autoFocus
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2 justify-end px-5 pb-4 pt-2 bg-muted/20">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleEditCancel}
                                  className="gap-1.5"
                                >
                                  <X className="h-3.5 w-3.5" />
                                  Cancel
                                </Button>
                                <Button size="sm" onClick={handleEditSave} className="gap-1.5">
                                  <Check className="h-3.5 w-3.5" />
                                  Save
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <span>{String(row[column.key] ?? "")}</span>
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Popover
                      open={editingRowAllFields?.rowId === row.id}
                      onOpenChange={(open: boolean) => {
                        if (!open) handleEditCancel()
                      }}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                          onClick={() => {
                            handleEditAllStart(row.id)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit row</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-96 p-0 max-h-[600px] overflow-y-auto" align="end">
                        <div className="space-y-0">
                          <div className="px-5 pt-4 pb-3 border-b bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <Pencil className="h-4 w-4" />
                              Edit Row
                            </h4>
                          </div>
                          <div className="px-5 py-4 space-y-4">
                            {columns
                              .filter((col) => col.editable !== false)
                              .map((column, index) => (
                                <div key={column.key} className="space-y-2">
                                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    {column.label}
                                  </label>
                                  <Input
                                    value={
                                      editingRowAllFields
                                        ? String(editingRowAllFields.values[column.key] ?? "")
                                        : String(row[column.key] ?? "")
                                    }
                                    onChange={(e) => {
                                      if (editingRowAllFields) {
                                        setEditingRowAllFields({
                                          ...editingRowAllFields,
                                          values: {
                                            ...editingRowAllFields.values,
                                            [column.key]: e.target.value,
                                          },
                                        })
                                      }
                                    }}
                                    className="focus-visible:ring-2"
                                    autoFocus={index === 0}
                                  />
                                </div>
                              ))}
                          </div>
                          <div className="flex gap-2 justify-end px-5 pb-4 pt-2 bg-muted/20 sticky bottom-0 border-t">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleEditCancel}
                              className="gap-1.5"
                            >
                              <X className="h-3.5 w-3.5" />
                              Cancel
                            </Button>
                            <Button size="sm" onClick={handleEditAllSave} className="gap-1.5">
                              <Check className="h-3.5 w-3.5" />
                              Save All
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogTableWrapper>
      </DialogContent>
    </Dialog>
  )
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { memo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const ComponentToPrint = memo(() => (
  <div>
    <h1>Hello, Printing World!</h1>
  </div>
));

const Invoice = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <Label className="text-lg">Invoice</Label>
        <Button variant="destructive" onClick={handlePrint}>Print</Button>
      </CardHeader>
      <CardContent>
        <div style={{ border: 'solid' }}>
          <div ref={componentRef}>
            <ComponentToPrint />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Invoice

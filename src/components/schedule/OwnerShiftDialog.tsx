
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Check, Users } from "lucide-react";
import { format } from "date-fns";
import { useNotifications } from "@/contexts/NotificationContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Employee } from "@/types/schedule";

interface OwnerShiftDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onAssignShifts: (employeeId: number, dates: Date[], shiftType: 'full' | 'half') => void;
}

export const OwnerShiftDialog: React.FC<OwnerShiftDialogProps> = ({
  isOpen,
  onClose,
  employees,
  onAssignShifts,
}) => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [shiftType, setShiftType] = useState<'full' | 'half'>('full');

  const handleDayClick = (date: Date) => {
    const currentIndex = selectedDates.findIndex(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (currentIndex >= 0) {
      // Date is already selected, remove it
      const newSelectedDates = [...selectedDates];
      newSelectedDates.splice(currentIndex, 1);
      setSelectedDates(newSelectedDates);
    } else {
      // Date is not selected, add it
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleAssignShifts = () => {
    if (!selectedEmployee) {
      toast({
        title: "Выберите сотрудника",
        description: "Необходимо выбрать сотрудника для назначения смен.",
        variant: "destructive",
      });
      return;
    }

    if (selectedDates.length === 0) {
      toast({
        title: "Выберите даты",
        description: "Необходимо выбрать хотя бы одну дату для назначения смены.",
        variant: "destructive",
      });
      return;
    }

    onAssignShifts(selectedEmployee, selectedDates, shiftType);
    
    const employeeName = employees.find(e => e.id === selectedEmployee)?.name || '';
    toast({
      title: "Смены назначены",
      description: `${selectedDates.length} смен назначено для ${employeeName}.`,
    });
    
    addNotification({
      title: "Назначение смен",
      message: `${selectedDates.length} смен назначено для ${employeeName}.`,
      type: "info",
    });
    
    resetAndClose();
  };

  const resetAndClose = () => {
    setSelectedEmployee(null);
    setSelectedDates([]);
    setShiftType('full');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Назначение смен</DialogTitle>
          <DialogDescription>
            Выберите сотрудника и даты для назначения смен
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Выберите сотрудника:</h3>
            <div className="grid gap-2">
              {employees.map((employee) => (
                <div 
                  key={employee.id}
                  className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                    selectedEmployee === employee.id ? "border-primary bg-primary/10" : ""
                  }`}
                  onClick={() => setSelectedEmployee(employee.id)}
                >
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>{employee.name}</span>
                  </div>
                  {selectedEmployee === employee.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Тип смены:</h3>
            <RadioGroup 
              value={shiftType} 
              onValueChange={(value) => setShiftType(value as 'full' | 'half')}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full">Полный день</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="half" id="half" />
                <Label htmlFor="half">Пол дня</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Выберите даты смен:</h3>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(date) => date && handleDayClick(date)}
              className="rounded-md border"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose}>
            Отмена
          </Button>
          <Button onClick={handleAssignShifts}>
            Назначить смены
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

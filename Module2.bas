Attribute VB_Name = "Module2"
' Yaskawa Europe GmbH
' Created by Daniel Mendt / YEU
' 2011

'Beta Version

Sub Start()

Dim Rmax As Single
Dim VClass As Integer
Dim EDPer As Integer
Dim Tbmax As Single
Dim CDBR As String
Dim MinRRow As Integer
Dim MinColumn As Integer
Dim Rmin As Single
Dim i As Integer
Dim j As Integer
Dim Ix As Single
Dim DCBusV As Integer
Dim Imin As Single
Dim Imax As Single
Dim Sel As Boolean
Dim Qtty As Integer
Dim Pel As Single
Dim PelMax As Single

'Make sure all data has been entered
If (Worksheets("Tool").[F22].Value = "-") Or (Worksheets("Tool").[F35].Value = "-") Or (Worksheets("Tool").[F29].Value = 0) Then
    Worksheets("Tool").[D46].ClearContents      'Rmin
    Worksheets("Tool").[F46].ClearContents      'Rmax
    Worksheets("Tool").[E48].ClearContents      'Pel
    Worksheets("Tool").[E50].ClearContents      'Pelmax
    Worksheets("Tool").[D44].Value = ""         'CDBR
    Worksheets("Tool").[H44].Value = ""         'Qtty1
    Worksheets("Tool").[H46].Value = ""         'Qtty2
    Worksheets("Tool").[L46].ClearContents
    Worksheets("Tool").[N46].ClearContents
    Worksheets("Tool").[M48].ClearContents
    Worksheets("Tool").[M50].ClearContents
    Worksheets("Tool").[L44].Value = ""
    Worksheets("Tool").[P44].Value = ""
    Worksheets("Tool").[P46].Value = ""
    MsgBox "Please input the Average Mechanical Power, Drive Voltage Class, ED%, Hoist Height, and Hoist Linear Speed.", vbOKOnly + vbExclamation, "Data Missing"

'Import data from Worksheet
Else
    VClass = Worksheets("Tool").[J22].Value
    Rmax = Worksheets("Tool").[F22].Value
    EDPer = Worksheets("Tool").[F29].Value
    Tbmax = Worksheets("Tool").[F35].Value
    If VClass = 200 Then
        MinRRow = 3
        DCBusV = 380
    ElseIf VClass = 400 Then
        MinRRow = 7
        DCBusV = 760
    End If
    
    If EDPer = 20 Then
        MinColumn = 16
    ElseIf EDPer = 30 Then
        MinColumn = 8
    ElseIf EDPer = 40 Then
        MinColumn = 0
    End If

    'CDBR Search
    Sel = False
    For i = MinRRow To MinRRow + 3
        Rmin = Worksheets("Data").Cells(i, 5).Value
        If Rmin < Rmax Then
            Imax = DCBusV / Rmin
            Imin = DCBusV / Rmax
            For j = 6 To 21
                If Tbmax < Worksheets("CDBR_Points").Cells(j, 2).Value Then
                    Ix = FindIx(j, MinColumn + i, Tbmax)
                    If (Imin < Ix) Then
                        If (Imax > Ix) Then
                            Imax = Ix
                            Rmin = DCBusV / Imax
                        End If
                    Else
                        Exit For
                    End If
                    If (Rmax - Rmin) > Rmax * 0.1 Then Sel = True       'Account for resistor tolerance of 10%
                    Exit For
                End If
            Next j
        End If
        If Sel = True Then
            CDBR = Worksheets("Data").Cells(i, 4).Value
            Pel = Worksheets("Tool").[F18].Value
            PelMax = Worksheets("Tool").[F20].Value
            Qtty = 1
            Exit For
        End If
    Next i
       
    'More than one CDBR needed
    If Sel = False Then
        If VClass = 200 Then CDBR = "CDBR-2110B"
        If VClass = 400 Then CDBR = "CDBR-4220B"
        For j = 6 To 21
            If Tbmax < Worksheets("CDBR_Points").Cells(j, 2).Value Then
                Ix = FindIx(j, MinColumn + MinRRow + 3, Tbmax)
                Exit For
            End If
        Next j
        Rmin = DCBusV / Ix
        Qtty = Int((Rmin / Rmax) + 1)
        Rmax = Qtty * Rmax
        If (Rmax - Rmin) < Rmax * 0.15 Then
            Qtty = Qtty + 1
            Rmax = (Rmax / (Qtty - 1)) * Qtty
        End If
        Pel = Worksheets("Tool").[F18].Value / Qtty
        PelMax = Worksheets("Tool").[F20].Value / Qtty
        Sel = True
        i = 10
    End If
        
    'PrintValues
    If Sel = True Then
        Worksheets("Tool").[D44].Value = CDBR
        Worksheets("Tool").[H44].Value = Qtty
        Worksheets("Tool").[H46].Value = Qtty
        Worksheets("Tool").[D46].Value = Rmin
        Worksheets("Tool").[F46].Value = Rmax
        Worksheets("Tool").[E48].Value = Pel
        Worksheets("Tool").[E50].Value = PelMax
    End If
    
    'Alternate Selection
    If (i <> MinRRow) And (Sel = True) Then
        Rmax = Worksheets("Tool").[F22].Value
        Rmin = Worksheets("Data").Cells(i - 1, 5).Value
        CDBR = Worksheets("Data").Cells(i - 1, 4).Value
        For j = 6 To 21
            If Tbmax < Worksheets("CDBR_Points").Cells(j, 2).Value Then
                Ix = FindIx(j, MinColumn + i - 1, Tbmax)
                Exit For
            End If
        Next j
        Rmin = DCBusV / Ix
        Qtty = Int((Rmin / Rmax) + 1)
        Rmax = Qtty * Rmax
        If (Rmax - Rmin) < Rmax * 0.15 Then
            Qtty = Qtty + 1
            Rmax = (Rmax / (Qtty - 1)) * Qtty
        End If
        Pel = Worksheets("Tool").[F18].Value / Qtty
        PelMax = Worksheets("Tool").[F20].Value / Qtty
        
        'Print Alt Values
        Worksheets("Tool").[L44].Value = CDBR
        Worksheets("Tool").[P44].Value = Qtty
        Worksheets("Tool").[P46].Value = Qtty
        Worksheets("Tool").[L46].Value = Rmin
        Worksheets("Tool").[N46].Value = Rmax
        Worksheets("Tool").[M48].Value = Pel
        Worksheets("Tool").[M50].Value = PelMax
    Else
        Worksheets("Tool").[L46].ClearContents
        Worksheets("Tool").[N46].ClearContents
        Worksheets("Tool").[M48].ClearContents
        Worksheets("Tool").[M50].ClearContents
        Worksheets("Tool").[L44].Value = "No smaller CDBR available"
        Worksheets("Tool").[P44].Value = ""
        Worksheets("Tool").[P46].Value = ""
    End If
    
End If

End Sub


'Find mystery CDBR current based on line function y = m.x + b

Public Function FindIx(c1 As Integer, l1 As Integer, y As Single) As Single

Dim x1 As Single
Dim x2 As Single
Dim y1 As Single
Dim y2 As Single
Dim m As Single
Dim b As Single

'GetData
x1 = Worksheets("CDBR_Points").Cells(c1 - 1, l1).Value
x2 = Worksheets("CDBR_Points").Cells(c1, l1).Value
y1 = Worksheets("CDBR_Points").Cells(c1 - 1, 2).Value
y2 = Worksheets("CDBR_Points").Cells(c1, 2).Value

'Slope
m = (y2 - y1) / (x2 - x1)

'Y-crossing
b = y1 - m * x1

'Mystery current value Ix
FindIx = (y - b) / m

End Function

m = csvread('298_1.txt'); 
m1 = csvread('298_2.txt');
m2 = csvread('298_3.txt');
m3 = csvread('595_2.txt');
m4 = csvread('298_4.txt');
m5 = csvread('595_1.txt');

t = m4(:,1);
%accel = m3(:,2);
accel = cat(1, m(:,2),m5(:,2), m1(:,2), m2(:,2), m3(:,2)); 

%states

NONE = 0; 
STOPPED = 1; 
RETURNING = 2; 
WALL_PUSH = 3; 
SWIMMING = 4;
STOPPING = 5; 
TRIGGER = 6; 

state = STOPPED;

L1 = 0.1;
L2 = 0.01;
L3 = 0.01;

xfm1 = 9.83;
vim1 = 0; 
sim1 = 0;

R = zeros(1, length(accel)); 
OUT = zeros(1, length(accel));
timer = 0; 
estimated_stop = 0; 
r = 0;
trigger_value = 0; 
for i=2:length(accel)
    xf = L1*accel(i) + (1-L1)*xfm1; 
    vi = L2*(accel(i)-xfm1) * (accel(i)-xfm1) + (1-L2)*vim1; 
    si = L3*(accel(i)-accel(i-1)) * (accel(i)-accel(i-1)) + (1-L3)*sim1;
    rprev = r; 
    r = ((2-L1) *vi) / si;
    
    xfm1 = xf; 
    vim1 = vi; 
    sim1 = si; 
    
    R(i) = ((2-L1) *vi) / si; 
    
    if i < 100
        OUT(i) = 0; 
        continue; 
    end
    
    switch state
        case STOPPED
            OUT(i) = 0; 
            if r > 4
                state = TRIGGER;
                trigger_value = r; 
                timer = 0; 
            end
        case TRIGGER
            OUT(i) = 0; 
            timer = timer + 1; 
            if timer > 5
                if abs(trigger_value - r) < 1
                    trigger_value
                    r
                    % it was probably a tap
                    state = STOPPED; 
                else
                    state = WALL_PUSH; 
                    timer = 0;
                end
            end
        case WALL_PUSH 
            OUT(i) = 0; 
            timer = timer + 1; 
            if timer > 64 && r > 3
               state = SWIMMING;
               i
            end
        case SWIMMING
            OUT(i) = 15; 
            
            if rprev > 1 && r < 1
                timer = 0; 
                state = STOPPED;
                i
            end
        case RETURNING
            OUT(i) = 0; 
        otherwise
    end
end

Y = ones(1, length(R));
plot(R);
hold on; 
plot(Y); 
plot(accel);
plot(OUT); 
hold off; 
axis([0 length(R) 0 20]);